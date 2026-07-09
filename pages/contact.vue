<template>
  <div>
    <Header />
    <PageHeader
      bgKey="contact"
      :pageTitle="$t('pages.contact.title')"
      :pageName="$t('pages.contact.name')"
      :eyebrow="$t('pages.contact.eyebrow')"
      :subtitle="$t('pages.contact.subtitle')"
    />
    <ContactPageForm />
    <GoogleMap />
    <CallToActionOne />
    <Footer />
    <SearchPopup />
    <MobileDrawer />
  </div>
</template>
