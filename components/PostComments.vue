<template>
  <div>
    <div class="comment-one">
      <h3 class="comment-one__title">Comments</h3>
      <div class="comment-one__single">
        <div class="comment-one__image">
          <img src="~images/blog/comment-1-1.jpg" alt="" />
        </div>
        <div class="comment-one__content">
          <h3>David Marks <span>3 hours ago</span></h3>
          <p>
            Sending love. My nephews Nick and Anthony Salaber are your
            teammates, so I know the caliber person you are. Our whole family is
            sending our best to you and your family.
          </p>
          <a href="#" class="comment-one__btn thm-btn"
            ><i class="fas fa-arrow-circle-right"></i>Reply</a
          >
        </div>
      </div>
      <div class="comment-one__single">
        <div class="comment-one__image">
          <img src="~images/blog/comment-1-2.jpg" alt="" />
        </div>
        <div class="comment-one__content">
          <h3>Christine Eve <span>3 hours ago</span></h3>
          <p>
            Sending love. My nephews Nick and Anthony Salaber are your
            teammates, so I know the caliber person you are. Our whole family is
            sending our best to you and your family.
          </p>
          <a href="#" class="comment-one__btn thm-btn"
            ><i class="fas fa-arrow-circle-right"></i>Reply</a
          >
        </div>
      </div>
    </div>
    <div class="comment-form">
      <h3 class="comment-form__title">Leave a Comment</h3>
      <form action="#" class="comment-one__form contact-form-validated">
        <div class="row">
          <div class="col-xl-6">
            <div class="comment-form__input-box">
              <input type="text" placeholder="Your name" name="name" />
            </div>
          </div>
          <div class="col-xl-6">
            <div class="comment-form__input-box">
              <input type="email" placeholder="Email address" name="email" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12">
            <div class="comment-form__input-box">
              <textarea name="message" placeholder="Write message"></textarea>
            </div>
            <button type="submit" class="thm-btn comment-form__btn">
              <i class="fas fa-arrow-circle-right"></i>Submit Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
