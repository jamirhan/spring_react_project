package com.bbiff.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Lob;

@Entity
@Table(name = "response")
public class Response {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "text")
    private String text;

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "post_id")
    private Long postId;

    public Response() {
    }

    public Response(String text, Long ownerId, Long postId) {
        this.text = text;
        this.ownerId = ownerId;
        this.postId = postId;
    }

    public Response(Long id, String text, Long ownerId, Long postId) {
        this.id = id;
        this.text = text;
        this.ownerId = ownerId;
        this.postId = postId;
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

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
