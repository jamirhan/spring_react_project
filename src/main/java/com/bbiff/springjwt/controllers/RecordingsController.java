package com.bbiff.springjwt.controllers;

import com.bbiff.springjwt.repository.RecordingsRepository;
import com.bbiff.springjwt.repository.UserRepository;
import com.bbiff.springjwt.models.Recording;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import com.bbiff.springjwt.security.services.UserDetailsImpl;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;

import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.Collection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/recordings")
public class RecordingsController {

    private final RecordingsRepository recordingsRepository;

    public RecordingsController(RecordingsRepository musicRepository) {
        this.recordingsRepository = musicRepository;
    }

    @GetMapping("{id}.flac")
    public ResponseEntity<byte[]> downloadRecording(@PathVariable Long id) {
        // get music file from folder ../recordings
        System.out.println("downloadFile" + id);
        Recording recording = recordingsRepository.findById(id).orElseThrow(RuntimeException::new);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=\"" + recording.getId() + ".flac" + "\"")
                .body(recording.getFile());
    }

    // method that returns all recordings of a user with id = userId:
    // SELECT id, owner FROM recording WHERE owner = userId

    // @Query(value = "SELECT id, owner FROM recording WHERE owner = ?1",
    // nativeQuery = true)
    // private Collection<Long> getRecordings(Long UserId);

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/my")
    public ResponseEntity getMyRecordings() {
        // get all recordings of the current user
        System.out.println("getMyRecordings");
        UserDetailsImpl user = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<Recording> recordings = recordingsRepository.findAllByOwnerId(user.getId());
        // return recording ids
        Collection<Long> ids = new ArrayList<Long>();
        recordings.forEach(rec -> ids.add(rec.getId()));
        return ResponseEntity.ok(ids);
    }

    @GetMapping("/all")
    public ResponseEntity getAllRecordings() {
        // get all recordings by not the current user
        System.out.println("getAllRecordings");
        UserDetailsImpl user = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<Recording> recordings = recordingsRepository.findAllByOwnerIdNot(user.getId());
        Collection<Long> ids = new ArrayList<Long>();
        recordings.forEach(rec -> ids.add(rec.getId()));
        return ResponseEntity.ok(ids);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteRecording(@PathVariable Long id) {
        recordingsRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/upload")
    public ResponseEntity createRecording(@RequestParam("file") MultipartFile file) throws URISyntaxException {
        System.out.println("uploadFile");
        UserDetailsImpl user = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try {
            Recording recording = new Recording(file.getBytes(), user.getId());
            recordingsRepository.save(recording);
            recordingsRepository.findAll().forEach(rec -> System.out.println(rec.getId()));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Could not upload the file: " + file.getOriginalFilename() + "!");
        }
    }
}