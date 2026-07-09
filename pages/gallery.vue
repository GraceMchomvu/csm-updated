<template>
  <div>
    <Header />
    <PageHeader
      bgKey="gallery"
      :pageTitle="$t('pages.gallery.title')"
      :pageName="$t('pages.gallery.name')"
      :eyebrow="$t('pages.gallery.eyebrow')"
      :subtitle="$t('pages.gallery.subtitle')"
    />
    <GalleryGrid />
    <Footer />
    <SearchPopup />
    <MobileDrawer />
  </div>
</template>
