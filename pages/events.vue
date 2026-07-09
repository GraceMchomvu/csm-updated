<template>
  <div>
    <Header />
    <PageHeader
      bgKey="services"
      :pageTitle="$t('pages.events.title')"
      :pageName="$t('pages.events.name')"
      :eyebrow="$t('pages.events.eyebrow')"
      :subtitle="$t('pages.events.subtitle')"
    />
    <EventsGrid />
    <Footer />
    <SearchPopup />
    <MobileDrawer />
  </div>
</template>
