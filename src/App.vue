<template>
  <Header />
  <RouterView />    <!-- 페이지가 변경이 되었을 때 바뀌는 부분 -->
  <Footer />
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
<!--<style lang="scss">
 @import "~/scss/main";
</style>-->