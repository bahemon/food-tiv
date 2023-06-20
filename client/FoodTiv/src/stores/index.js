import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2'

export const useIndexStore = defineStore('index', {
  state: () => ({
    BASE_URL: 'http://localhost:3000',
    isLogin: false,
    currentUser: {},
    foodReviews: [],
    foodReviewToShow: {},
    restaurantMenuToShow: [],
    categories: [],
    googleMap: {
      map: '',
      service: '',
      infowindow: ''
    }
  }),
  getters: {

  },
  actions: {
    async register(registerData) {
      try {
        await axios({
          method: 'POST',
          url: `${this.BASE_URL}/register`,
          data: {
            username: registerData.username,
            email: registerData.email,
            password: registerData.password,
            phoneNumber: registerData.phoneNumber
          }
        })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Register success, please login first',
          showConfirmButton: false,
          timer: 1500
        })

        this.router.push('/login')
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      }
    },
    async login(loginData) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.BASE_URL}/login`,
          data: {
            email: loginData.email,
            password: loginData.password,
          }
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Welcome ${data.username}!`,
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem('access_token', data.access_token)
        await this.getUserProfile()
        this.isLogin = true
        this.router.push('/')
      } catch (err) {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      }
    },
    async googleSignIn(response) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.BASE_URL}/google-sign-in`,
          headers: {
            token: response.credential
          }
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Welcome ${data.username}!`,
          showConfirmButton: false,
          timer: 1500
        })

        localStorage.setItem('access_token', data.access_token)
        await this.getUserProfile()
        this.isLogin = true
        this.router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    logout() {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully logout',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.removeItem('access_token')
      this.currentUser = {}
      this.isLogin = false
      this.router.push('/')
    },
    async getUserProfile() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.BASE_URL}/profile`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.currentUser = data
      } catch (err) {
        console.log(err)
      }
    },
    async getFoodReviewData() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.BASE_URL}/foodReviews`
        })
        this.foodReviews = data
      } catch (err) {
        console.log(err)
      }
    },
    async getFoodReviewDetail(foodReviewId) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.BASE_URL}/foodReviews/${foodReviewId}`
        })

        this.foodReviewToShow = data
        this.router.push(`/foodReviews/${foodReviewId}`)
      } catch (err) {
        console.log(err)
      }
    },
    async getCategories() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.BASE_URL}/categories`
        })
        this.categories = data
      } catch (err) {
        console.log(err)
      }
    },
    async getRestaurantMenu(foodReviewId) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.BASE_URL}/restaurantMenus/${foodReviewId}`
        })
        this.restaurantMenuToShow = data
      } catch (err) {
        console.log(err)
      }
    },
    async addFoodReview(formData) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.BASE_URL}/foodReviews`,
          headers: {
            access_token: localStorage.access_token
          },
          data: formData
        })

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Your review has been published`,
          showConfirmButton: false,
          timer: 1500
        })

        this.router.push(`/foodReviews/${data.id}`)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteFoodReview(id) {
      try {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })

        if (result.isConfirmed) {
          await axios({
            method: 'DELETE',
            url: `${this.BASE_URL}/foodReviews/${id}`,
            headers: {
              access_token: localStorage.access_token
            }
          })
          Swal.fire(
            'Deleted!',
            'Your review has been deleted.',
            'success'
          )

          this.getFoodReviewData()
          this.router.push('/')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async upgradeToPremium() {
      try {
        if (this.currentUser.role === 'Premium') {
          Swal.fire({
            position: 'middle',
            icon: 'success',
            title: `Your role is already premium`,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          const { data } = await axios({
            method: 'POST',
            url: `${this.BASE_URL}/generateMidtransToken`,
            headers: {
              access_token: localStorage.access_token
            }
          })

          const callback = this.updateUserRole

          window.snap.pay(data.token, {
            onSuccess: async function (result) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Payment Success`,
                showConfirmButton: false,
                timer: 1500
              })
              callback()
            },
            onPending: function (result) {
              Swal.fire(
                'The Internet?',
                'That thing is still around?',
                'question'
              )
            },
            onError: function (result) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Payment failed'
              })
            },
            onClose: function () {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You closed the popup without finishing the payment'
              })
            }
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    async updateUserRole() {
      try {
        await axios({
          method: 'PATCH',
          url: `${this.BASE_URL}/premiumMember`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.getUserProfile()
      } catch (err) {
        console.log(err)
      }
    },
  },
})