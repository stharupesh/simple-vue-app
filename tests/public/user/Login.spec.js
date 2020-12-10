import {mount} from '@vue/test-utils'
import Login from '@/views/public/user/Login.vue'

describe('Login', () => {
    it('renders login page properly', () => {
        /**
         * Arrange
         */
        const wrapper = mount(Login, {
            stubs: ['base-input', 'base-button', 'card']
        })

        const expectedPageHeading = { selector: '.login-page h4', text: 'User Login' }
        const expectedSubmitBtn = { selector: '#sign-in-btn', text: 'Sign In' }

        /**
         * Act
         */
        const pageHeadingTxt = wrapper.find(expectedPageHeading.selector).text();
        const submitBtnTxt = wrapper.find(expectedSubmitBtn.selector).text()

        /**
         * Assert
         */
        expect(pageHeadingTxt).toEqual(expectedPageHeading.text)
        expect(submitBtnTxt).toEqual(expectedSubmitBtn.text)
    })
})