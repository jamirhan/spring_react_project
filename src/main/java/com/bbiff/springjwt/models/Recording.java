package com.bbiff.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Lob;

@Entity
@Table(name = "recording")
public class Recording {

    @Id
    @GeneratedValue
    private Long id;

    @Lob
    @Column(name = "file")
    private byte[] file;

    @Column(name = "owner_id")
    private Long ownerId;

    public Recording() {
    }

    public Recording(byte[] file, Long ownerId) {
        this.file = file;
        this.ownerId = ownerId;
    }

    public Recording(Long id, byte[] file, Long ownerId) {
        this.id = id;
        this.file = file;
        this.ownerId = ownerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }
}
