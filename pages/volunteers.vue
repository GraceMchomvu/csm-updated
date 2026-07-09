<template>
  <div>
    <Header />
    <PageHeader
      bgKey="ministry"
      :pageTitle="$t('pages.volunteers.title')"
      :pageName="$t('pages.volunteers.name')"
      :eyebrow="$t('pages.volunteers.eyebrow')"
      :subtitle="$t('pages.volunteers.subtitle')"
    />
    <VolunteerGrid />
    <CallToActionOne />
    <Footer />
    <SearchPopup />
    <MobileDrawer />
  </div>
</template>
