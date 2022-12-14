package com.bbiff.springjwt.controllers;

import com.bbiff.springjwt.repository.ResponseRepository;
import com.bbiff.springjwt.repository.UserRepository;
import com.bbiff.springjwt.models.Response;
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

class ResponseRequest {
    public String text;
    public Long postId;
}

class ResponseMeta {
    public String username;
    public String text;

    ResponseMeta(String username, String text) {
        this.username = username;
        this.text = text;
    }
}

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/responses")
public class ResponseController {

    ResponseRepository responseRepository;
    UserRepository userRepository;

    public ResponseController(ResponseRepository responseRepository, UserRepository userRepository) {
        this.responseRepository = responseRepository;
        this.userRepository = userRepository;
    }

    private Collection<ResponseMeta> toResponseMeta(Collection<Response> resp) {
        Collection<ResponseMeta> res = new ArrayList<ResponseMeta>();
        resp.forEach(rec -> res
                .add(new ResponseMeta(userRepository.findById(rec.getOwnerId()).get().getUsername(), rec.getText())));
        return res;
    }

    @GetMapping("{id}")
    public ResponseEntity getResponse(@PathVariable Long id) {
        Collection<Response> response = responseRepository.findAllByPostId(id);

        return ResponseEntity.ok(toResponseMeta(response));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/my")
    public ResponseEntity getMyResponses() {
        UserDetailsImpl user = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<Response> responses = responseRepository.findAllByOwnerId(user.getId());
        Collection<Long> ids = new ArrayList<Long>();
        responses.forEach(resp -> ids.add(resp.getId()));
        return ResponseEntity.ok((ids));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/new")
    public ResponseEntity<Response> createResponse(@RequestBody ResponseRequest request)
            throws URISyntaxException {
        // get text and id of post from request body

        UserDetailsImpl user = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Response response = new Response();
        response.setOwnerId(user.getId());
        response.setPostId(request.postId);
        response.setText(request.text);
        responseRepository.save(response);

        return ResponseEntity.created(new URI("/api/responses/" + response.getId())).body(response);
    }
}
