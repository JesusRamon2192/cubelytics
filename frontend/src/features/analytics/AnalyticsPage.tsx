import React from 'react';
import { useAnalytics } from './hooks/useAnalytics';
import { useTimerStore } from '../../store/useTimerStore';
import { useIsMobile } from '../../hooks/useIsMobile';
import { DesktopAnalyticsLayout } from './DesktopAnalyticsLayout';
import { MobileAnalyticsLayout } from './MobileAnalyticsLayout';
import './AnalyticsPage.css';

const AnalyticsPage: React.FC = () => {
    const { 
        validSolvesCount, generalProgress, averagesProgress, 
        cfopPhases, consistency 
    } = useAnalytics();
    
    // Using global stats for KPI cards, or fallback to our derived data 
    // if we want to show it strictly based on validSolves in the current cache.
    const stats = useTimerStore(state => state.stats);
    
    const isMobile = useIsMobile(768);

    const commonProps = {
        validSolvesCount,
        stats,
        generalProgress,
        averagesProgress,
        cfopPhases,
        consistency
    };

    return isMobile ? (
        <MobileAnalyticsLayout {...commonProps} />
    ) : (
        <DesktopAnalyticsLayout {...commonProps} />
    );
};

export default AnalyticsPage;
