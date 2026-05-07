package com.shayarify.backend.dto.error;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorResponse {

    private int status;              // HTTP status code (e.g., 404, 500)
    private String error;            // Short error name (e.g., "NOT_FOUND")
    private String message;          // Detailed message
    private String path;             // API endpoint path
    private LocalDateTime timestamp; // When error occurred
    private List<String> details;    // Extra errors (for validation etc.)

    // Constructor for simple errors
    public ErrorResponse(int status, String error, String message, String path) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.timestamp = LocalDateTime.now();
    }

    // Constructor with details (for validation errors)
    public ErrorResponse(int status, String error, String message, String path, List<String> details) {
        this(status, error, message, path);
        this.details = details;
    }

    public static ErrorResponse simple(int status, String error, String message, String path) {
        return new ErrorResponse(status, error, message, path);
    }

    public static ErrorResponse detailed(int status, String error, String message, String path, List<String> details) {
        return new ErrorResponse(status, error, message, path, details);
    }
}
