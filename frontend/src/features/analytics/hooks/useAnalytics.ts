import { useMemo } from 'react';
import { useTimerStore } from '../../../store/useTimerStore';
import { calculateAverage, calculateAoX, calculateStandardDeviation, calculateVariance, calculateMovingAverage } from '../utils/math';

export const useAnalytics = () => {
    const solves = useTimerStore(state => state.solves);

    return useMemo(() => {
        // Reverse solves so chronological order is maintained for graphs (oldest to newest)
        const validSolves = [...solves].reverse().filter(s => s.penalty !== 'DNF');
        const times = validSolves.map(s => s.totalTimeMillis / 1000); // work with seconds
        
        // 1. General Progress
        const movingAverages = calculateMovingAverage(times, 12); // AO12 as moving average
        const generalProgress = validSolves.map((solve, i) => ({
            index: i + 1,
            time: Number(times[i].toFixed(2)),
            movingAverage: movingAverages[i] !== null ? Number(movingAverages[i]?.toFixed(2)) : null,
            date: new Date(solve.timestamp).toLocaleDateString()
        }));

        // 2. Averages over time
        const averagesProgress = validSolves.map((_, i) => {
            const currentSlice = times.slice(0, i + 1);
            return {
                index: i + 1,
                ao5: calculateAoX(currentSlice, 5),
                ao12: calculateAoX(currentSlice, 12),
                ao50: calculateAoX(currentSlice, 50),
                ao100: calculateAoX(currentSlice, 100),
            };
        }).map(item => ({
            index: item.index,
            ao5: item.ao5 !== null ? Number(item.ao5.toFixed(2)) : null,
            ao12: item.ao12 !== null ? Number(item.ao12.toFixed(2)) : null,
            ao50: item.ao50 !== null ? Number(item.ao50.toFixed(2)) : null,
            ao100: item.ao100 !== null ? Number(item.ao100.toFixed(2)) : null,
        }));

        // 3. CFOP Phases
        const hasPhases = validSolves.filter(s => s.crossTimeMillis);
        let cfopPhases: Array<{name: string, average: number, stdDev: number, percentage: number}> = [];
        
        if (hasPhases.length > 0) {
            const crossTimes = hasPhases.map(s => (s.crossTimeMillis || 0) / 1000);
            const f2lTimes = hasPhases.map(s => (s.f2lTimeMillis || 0) / 1000);
            const ollTimes = hasPhases.map(s => (s.ollTimeMillis || 0) / 1000);
            const pllTimes = hasPhases.map(s => (s.pllTimeMillis || 0) / 1000);

            const avgCross = calculateAverage(crossTimes);
            const avgF2l = calculateAverage(f2lTimes);
            const avgOll = calculateAverage(ollTimes);
            const avgPll = calculateAverage(pllTimes);
            const totalAvg = avgCross + avgF2l + avgOll + avgPll;

            cfopPhases = [
                {
                    name: 'Cross',
                    average: Number(avgCross.toFixed(2)),
                    stdDev: Number(calculateStandardDeviation(crossTimes).toFixed(2)),
                    percentage: Number(((avgCross / totalAvg) * 100).toFixed(1))
                },
                {
                    name: 'F2L',
                    average: Number(avgF2l.toFixed(2)),
                    stdDev: Number(calculateStandardDeviation(f2lTimes).toFixed(2)),
                    percentage: Number(((avgF2l / totalAvg) * 100).toFixed(1))
                },
                {
                    name: 'OLL',
                    average: Number(avgOll.toFixed(2)),
                    stdDev: Number(calculateStandardDeviation(ollTimes).toFixed(2)),
                    percentage: Number(((avgOll / totalAvg) * 100).toFixed(1))
                },
                {
                    name: 'PLL',
                    average: Number(avgPll.toFixed(2)),
                    stdDev: Number(calculateStandardDeviation(pllTimes).toFixed(2)),
                    percentage: Number(((avgPll / totalAvg) * 100).toFixed(1))
                }
            ];
        }

        // 4. Consistency (Histogram)
        let consistencyBuckets: Array<{range: string, count: number}> = [];
        let variance = 0;
        let stdDev = 0;
        
        if (times.length > 0) {
            variance = calculateVariance(times);
            stdDev = calculateStandardDeviation(times);
            
            const minTime = Math.floor(Math.min(...times));
            const maxTime = Math.ceil(Math.max(...times));
            
            // Bucket size dynamically adjusting
            const range = maxTime - minTime;
            const bucketSize = range > 20 ? 2 : range > 10 ? 1 : 0.5; 
            
            const buckets = new Map<string, number>();
            for (let i = minTime; i <= maxTime; i += bucketSize) {
                const limit = i + bucketSize;
                const label = `${i.toFixed(1)}-${limit.toFixed(1)}s`;
                buckets.set(label, 0);
            }

            times.forEach(t => {
                const lowerBound = Math.floor((t - minTime) / bucketSize) * bucketSize + minTime;
                const upperBound = lowerBound + bucketSize;
                const label = `${lowerBound.toFixed(1)}-${upperBound.toFixed(1)}s`;
                if(buckets.has(label)) {
                    buckets.set(label, buckets.get(label)! + 1);
                } else {
                    // fallback just in case
                    const fallbackLabel = `${(minTime).toFixed(1)}-${(minTime + bucketSize).toFixed(1)}s`;
                    buckets.set(fallbackLabel, (buckets.get(fallbackLabel) || 0) + 1);
                }
            });

            consistencyBuckets = Array.from(buckets.entries()).map(([range, count]) => ({
                range, count
            }));
        }

        return {
            validSolvesCount: validSolves.length,
            generalProgress,
            averagesProgress,
            cfopPhases,
            consistency: {
                buckets: consistencyBuckets,
                variance: Number(variance.toFixed(3)),
                stdDev: Number(stdDev.toFixed(3))
            }
        };
    }, [solves]);
};
