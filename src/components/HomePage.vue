<template>
    <ion-content class="container mt-5">
      <!-- Title -->
      <div class="text-center mb-5">
        <h2 class="display-4 mb-4">Stylish Carousel</h2>
        <p class="lead text-muted">Experience a stylish carousel with smooth animations and interactive elements.</p>
      </div>
  
      <!-- Carousel -->
      <div id="carouselExampleIndicators" class="carousel slide">
        <ol class="carousel-indicators">
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://via.placeholder.com/800x400?text=First+Slide" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>First Slide</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://via.placeholder.com/800x400?text=Second+Slide" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>Second Slide</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://via.placeholder.com/800x400?text=Third+Slide" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>Third Slide</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </a>
      </div>
  
      <!-- Loading Button -->
      <div class="text-center mt-5">
        <button class="btn btn-primary btn-lg" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseExample'" aria-expanded="false" aria-controls="collapseExample">
          <i class="bi bi-arrow-down-circle"></i> Show More
        </button>
      </div>
  
      <!-- Collapsible Section -->
      <div id="collapseExample" class="collapse mt-4">
        <div class="card card-body">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel purus eget purus tincidunt cursus non nec lorem. Donec vel tortor at ligula tristique feugiat. Suspendisse potenti.</p>
          <button class="btn btn-success btn-lg">
            <i class="bi bi-check2-circle"></i> Continue
          </button>
        </div>
      </div>
    </ion-content>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({});
  </script>
  
  <style>
    /* Carousel Styles */
    .carousel-inner img {
      transition: transform 0.5s ease-in-out;
    }
  
    .carousel-item-next, .carousel-item-prev, .carousel-item.active {
      transition: transform 0.5s ease;
    }
  
    .carousel-caption {
      bottom: 20px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      padding: 10px;
      transition: opacity 0.5s ease;
    }
  
    .carousel-control-prev-icon,
    .carousel-control-next-icon {
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
    }
  
    /* Button Styles */
    .btn-primary {
      background: linear-gradient(135deg, #007bff, #6610f2);
      border: none;
      transition: background 0.3s ease;
    }
  
    .btn-primary:hover {
      background: linear-gradient(135deg, #6610f2, #007bff);
    }
  
    .btn-success {
      background: #28a745;
      border: none;
      transition: background 0.3s ease;
    }
  
    .btn-success:hover {
      background: #218838;
    }
  
    /* Card Styles */
    .card-body {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
    }
  
    .card-body p {
      margin-bottom: 15px;
    }
  </style>
  