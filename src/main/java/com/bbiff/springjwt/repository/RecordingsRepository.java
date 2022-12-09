package com.bbiff.springjwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bbiff.springjwt.models.Recording;
import java.util.Collection;

public interface RecordingsRepository extends JpaRepository<Recording, Long> {
    Collection<Recording> findAllByOwnerId(Long ownerId);

    Collection<Recording> findAllByOwnerIdNot(Long ownerId);
}