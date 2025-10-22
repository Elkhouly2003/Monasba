package com.example.GraduationBackend.controller;

import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.model.Category;
import com.example.GraduationBackend.services.CategoryService;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Setter
@Getter
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/category")

public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/{categoryId}")
    public ResponseEntity<ApiResponse> getCategoryById(@PathVariable Long categoryId) {
        Category category ;
        try {
            category =   categoryService.getCategoryById(categoryId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(new ApiResponse("Category found", category ));

    }

    @GetMapping("/{categoryName}")
    public ResponseEntity<ApiResponse> getCategoryByName(@PathVariable String categoryName) {
        Category category ;
        try {
            category =   categoryService.getCategoryByName(categoryName);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(new ApiResponse("Category found", category ));

    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllCategories() {
        return ResponseEntity.ok(new ApiResponse("All categories", categoryService.getAllCategories()));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse>deleteCategoryById(@PathVariable Long categoryId) {

        try {
            categoryService.deleteCategory(categoryId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(new ApiResponse("Category deleted", categoryId));
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<ApiResponse>updateCategoryById(@PathVariable Long categoryId,@RequestParam String newName) {
        try {
            categoryService.updateCategory(categoryId , newName);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(new ApiResponse("Query success", "Category updated Successfully"));
    }

}
