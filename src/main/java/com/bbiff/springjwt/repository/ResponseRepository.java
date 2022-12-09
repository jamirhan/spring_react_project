package com.bbiff.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bbiff.springjwt.models.Response;
import java.util.Collection;

public interface ResponseRepository extends JpaRepository<Response, Long> {
    Collection<Response> findAllByOwnerId(Long ownerId);

    Collection<Response> findAllByPostId(Long postId);
}