package com.speedcube.timer.model.dto;

public class ScrambleDto {
    private String scramble;
    private String imagen;

    public ScrambleDto(String scramble, String imagen) {
        this.scramble = scramble;
        this.imagen = imagen;
    }

    public String getScramble() {
        return scramble;
    }

    public void setScramble(String scramble) {
        this.scramble = scramble;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}
