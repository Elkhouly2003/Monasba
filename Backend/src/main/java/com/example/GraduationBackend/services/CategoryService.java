package com.example.GraduationBackend.services;

import com.example.GraduationBackend.model.Category;
import com.example.GraduationBackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository ;

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(
                () ->  new ResourceNotFoundException("Category with id : " + id + "not found")
        );
    }

    public Category getCategoryByName(String name) {
       return categoryRepository.findByName(name).orElseThrow(
                () -> new ResourceNotFoundException("Category with name : " + name + "not found")
        );
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll() ;
    }

    public Category addCategory(Category category) {
        return categoryRepository.save(category) ;
    }

    public void deleteCategory(Long categoryId) {
        categoryRepository.findById(categoryId).ifPresentOrElse(categoryRepository::delete ,
                 ()->   new ResourceNotFoundException("Category with id : " + categoryId + "not found")
                );
    }

    public void updateCategory(Long categoryId , String newName) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new ResourceNotFoundException("Category with id : " + categoryId + "not found")
        );
        category.setName(newName);
        categoryRepository.save(category);
    }


}
