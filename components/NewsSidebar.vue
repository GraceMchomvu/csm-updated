<template>
  <div class="sidebar">
    <div class="sidebar__single sidebar__search">
      <form action="#" class="sidebar__search-form">
        <input type="search" placeholder="Search" />
        <button type="submit"><i class="icon-magnifying-glass"></i></button>
      </form>
    </div>
    <div class="sidebar__single sidebar__post">
      <h3 class="sidebar__title">Recent Posts</h3>
      <ul class="sidebar__post-list list-unstyled">
        <li>
          <div class="sidebar__post-image">
            <img src="~images/blog/lp-1-1.jpg" alt="" />
          </div>
          <div class="sidebar__post-content">
            <h3>
              <a href="#" class="sidebar__post-content_meta"
                ><i class="far fa-user-circle"></i>by Admin</a
              >
              <nuxt-link to="/news-details"
                >Help Children Rise out of Poverty</nuxt-link
              >
            </h3>
          </div>
        </li>
        <li>
          <div class="sidebar__post-image">
            <img src="~images/blog/lp-1-2.jpg" alt="" />
          </div>
          <div class="sidebar__post-content">
            <h3>
              <a href="#" class="sidebar__post-content_meta"
                ><i class="far fa-user-circle"></i>by Admin</a
              >
              <nuxt-link to="/news-details"
                >Help Children Rise out of Poverty</nuxt-link
              >
            </h3>
          </div>
        </li>
        <li>
          <div class="sidebar__post-image">
            <img src="~images/blog/lp-1-3.jpg" alt="" />
          </div>
          <div class="sidebar__post-content">
            <h3>
              <a href="#" class="sidebar__post-content_meta"
                ><i class="far fa-user-circle"></i>by Admin</a
              >
              <nuxt-link to="/news-details"
                >Help Children Rise out of Poverty</nuxt-link
              >
            </h3>
          </div>
        </li>
      </ul>
    </div>
    <div class="sidebar__single sidebar__category">
      <h3 class="sidebar__title">Categories</h3>
      <ul class="sidebar__category-list list-unstyled">
        <li>
          <a href="#"><i class="fas fa-arrow-circle-right"></i>Charity</a>
        </li>
        <li>
          <a href="#"><i class="fas fa-arrow-circle-right"></i>Fundrising</a>
        </li>
        <li>
          <a href="#"><i class="fas fa-arrow-circle-right"></i>Donations</a>
        </li>
        <li>
          <a href="#"><i class="fas fa-arrow-circle-right"></i>Save Lifes</a>
        </li>
        <li>
          <a href="#"><i class="fas fa-arrow-circle-right"></i>Health</a>
        </li>
        <li>
          <a href="#"><i class="fas fa-arrow-circle-right"></i>Education</a>
        </li>
        <li>
          <a href="#"><i class="fas fa-arrow-circle-right"></i>Food</a>
        </li>
        <li>
          <a href="#"><i class="fas fa-arrow-circle-right"></i>Water</a>
        </li>
      </ul>
    </div>
    <div class="sidebar__single sidebar__tags">
      <h3 class="sidebar__title">Popular Tags</h3>
      <div class="sidebar__tags-list">
        <a href="#">Donation</a>
        <a href="#">Charity</a>
        <a href="#">Poor</a>
        <a href="#">Education</a>
        <a href="#">Fundraising</a>
      </div>
    </div>
  </div>
</template>
