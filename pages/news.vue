<template>
  <div>
    <Header />
    <PageHeader
      bgKey="sermons"
      :pageTitle="$t('pages.news.title')"
      :pageName="$t('pages.news.name')"
      :eyebrow="$t('pages.news.eyebrow')"
      :subtitle="$t('pages.news.subtitle')"
    />
    <SermonsGrid />
    <Footer />
    <SearchPopup />
    <MobileDrawer />
  </div>
</template>
