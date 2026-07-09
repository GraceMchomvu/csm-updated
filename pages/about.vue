<template>
  <div>
    <Header />
    <PageHeader
      bgKey="about"
      :pageTitle="$t('pages.about.title')"
      :pageName="$t('pages.about.name')"
      :eyebrow="$t('pages.about.eyebrow')"
      :subtitle="$t('pages.about.subtitle')"
    />
    <AboutOne />
    <AboutBeliefs />
    <TestimonialsCarouselOne className="about-page-testimonial" />
    <CallToActionTwo className="join-one__about" />
    <Footer />
    <SearchPopup />
    <MobileDrawer />
  </div>
</template>
