package com.example.GraduationBackend.controller;

import com.example.GraduationBackend.dto.response.ApiResponse;
import com.example.GraduationBackend.model.Category;
import com.example.GraduationBackend.services.CategoryService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Setter
@Getter
@RestController
@RequiredArgsConstructor
@RequestMapping("/category")

public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/{categoryId}")
    public ResponseEntity<ApiResponse> getCategoryById(@PathVariable Long categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        return ResponseEntity.ok(new ApiResponse("Category found", category));
    }

    @GetMapping("/{categoryName}")
    public ResponseEntity<ApiResponse> getCategoryByName(@PathVariable String categoryName) {
        Category category = categoryService.getCategoryByName(categoryName);
        return ResponseEntity.ok(new ApiResponse("Category found", category));

    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllCategories() {
        return ResponseEntity.ok(new ApiResponse("All categories", categoryService.getAllCategories()));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse> deleteCategoryById(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok(new ApiResponse("Category deleted", categoryId));
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<ApiResponse> updateCategoryById(@PathVariable Long categoryId, @RequestParam String newName) {
        categoryService.updateCategory(categoryId, newName);
        return ResponseEntity.ok(new ApiResponse("Query success", "Category updated Successfully"));
    }

}
