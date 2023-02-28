<template>
  <div class="main-container">
    <section class="main-section section-info">
      <h2 class="main-info-header">Password management</h2>
      <h3 class="main-info-subheader">anyone, anytime, anywhere</h3>
      <p class="main-section-p">
        FirstPass is a password management solution that allows you to not only
        have your password vaults, but to have shared family or professionnal
        vaults.
      </p>
    </section>
    <section class="spacer-1">spacer 1</section>
    <section class="main-section section-second">
      <p class="main-section-p">
        Using state of the art, proprietary encryption of none at all, FirstPass
        allows you to store your in all simplicity.
      </p>
      <p class="main-section-p">
        The lack of encryption on our passwords is a fully intended security
        feature. We are trying to bamboozle any potential hackers into thinking
        that we are not storing your passwords in a secure manner. This will
        allow us to store your passwords in a secure manner. Effectively using
        the cover of hiding in plain sight.
      </p>
      <p class="main-section-p">
        We are not responsible for any loss of data or any other damages that
        may occur as a result of using our service.
      </p>
    </section>
    <section class="spacer-2">spacer 2</section>
    <section class="main-section section-third">
      <p class="main-section-p">
        Each user is entitled to as many vaults as their heart desires. Each
        vault can then be shared with as many people as you want.
      </p>
      <p class="main-section-p">
        Still sharing that netflix account? Well firstly, very naughty.
        Secondly, if you ever change your password, you won't have to send an
        insecure, possibly intercepted email to your friends and family. You can
        juste update the password in your shared vault.
      </p>
    </section>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  min-height: 100vh;
  background-image: url(https://images.unsplash.com/photo-1677411690139-817f7cf98da7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3132&q=80);
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow-x: hidden;
}

.main-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  background-color: transparent;
  color: black;
  margin-block: 4rem;
}

.section-info {
  color: black;
  height: clamp(300px, 25vh, 500px);
  min-height: fit-content;
}

.main-info-header {
  font-family: "Staatliches", cursive;
  font-size: 5rem;
  font-weight: 600;
  letter-spacing: 0.2rem;
}

.main-info-subheader {
  font-family: "Staatliches", cursive;
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 0.2rem;
}

.spacer-1,
.spacer-2 {
  height: 25vh;
  min-height: 200px;
  background-color: transparent;
  width: 110%;
}

.spacer-1 {
  height: 10vh;
  min-height: 120px;
  background-image: url(https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  rotate: 1deg;
}

.spacer-2 {
  height: 15vh;
  min-height: 150px;
  background-image: url(https://images.unsplash.com/photo-1581455987165-d1e60e0fbea5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8);
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  background-attachment: fixed;
  rotate: -2deg;
}

.main-section-p {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  text-align: center;
  margin-block: 1rem;
}
</style>
