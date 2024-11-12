<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required, helpers } from '@vuelidate/validators'
  import { useAuth } from '@/stores/auth'
  import http from '@/services/http'
  // import type { SubmitEventPromise } from 'vuetify'

  const router = useRouter()
  const auth = useAuth()
  const form = ref<HTMLFormElement | null>(null)
  const buttonLoading = ref<boolean>(false)
  const user = reactive({
    email: '',
    password: ''
  })
  const rules = {
    email: { 
      required: helpers.withMessage('Esse campo é obrigatório', required),
      email : helpers.withMessage('O campo deve ser um e-mail válido', email)
    },
    password: { required: helpers.withMessage('Esse campo é obrigatório', required) }
  }
  const validator = useVuelidate(rules, user)
  const authRule = [(value: any) => handleLogin()]

  const handleLogin = async () => {

    http.post('/auth/sign', user)
      .then((response) => {
        auth.setToken(response?.data?.data?.token)
        auth.setUser(response?.data?.data?.user)
        // router.push({name: 'home'})

      }).catch((error) => {
        console.log(error)

      })
  }

  const submit = async (event: any) => {
    const valid = await validator.value.$validate()
    if (!valid) return
    buttonLoading.value = true
    await event
    buttonLoading.value = false
  }
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-4">
          <v-img :width="300" class="mx-auto" src="/logo.png"></v-img>
          <v-divider class="mt-3"></v-divider>
          <v-card-title class="headline text-center">Painel Administrativo do Cliente</v-card-title>
          <v-card-text>
            
            <v-form validate-on="submit lazy" @submit.prevent="submit" ref="form">

              <v-text-field
                v-model="user.email"
                :error-messages="validator.email.$errors.map<any>(e => e.$message)"
                :rules="authRule"
                label="E-mail"
                required
                @blur="validator.email.$touch"
                @input="validator.email.$touch"
              ></v-text-field>

              <v-text-field
                v-model="user.password"
                type="password"
                :error-messages="validator.password.$errors.map<any>(e => e.$message)"
                label="Senha"
                required
                @blur="validator.password.$touch"
                @input="validator.password.$touch"
              ></v-text-field>

              <div class="d-flex justify-center mt-3 mb-6">
                <v-btn
                  color="primary" 
                  type="submit"
                  :loading="buttonLoading"
                  size="large"
                >Entrar</v-btn>
              </div>

              <p class="mt-2 text-center"><a href="#">Esqueceu sua senha?</a></p>
            </v-form>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .fill-height {
    height: 100vh;
  }
</style>