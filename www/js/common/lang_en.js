/**
 * Created by SudeshNT on 11/4/2016.
 */
angular.module('lang_en',['pascalprecht.translate','ngSanitize'])
  .config(['$translateProvider',function($translateProvider){
    $translateProvider.translations('en', {
      //main menu
      CUSTOMERS:'Customers',
      MERCHANTS:'Merchants',
      TRANSACTIONS:'Transactions',
      PROFILE:'Profile',
      MESSAGES:'Messages',
      MEDIA:'Media',
      FEES:'Fees',
      CIVIL_ID:'Civil ID',
      PAYMENT_URL:'Payment URL',
      ABOUT_US:'About US',
      LOGOUT:'Logout',
      LOGIN:'Login',
      REGISTER:'Register',
      FORGOT_PASSWORD:'Forgot Password?',
      // sub menus
      ALL:'All',
      WITHDRAWALS:'Withdrawals',
      REQUEST_WITHDRAWALS:'Request Withdraw',
      EDIT_PROFILE:'Edit Profile',
      CHANGE_PASSWORD:'Change Password',
      //balance bar
      ACTUAL:'actual',
      ON_HOLD:'on hold',
      CURRENT:'current',

      CONFIRM_PASSWORD:'Confirm Password',
      PASSWORD:'Password',
      SHOW_PASSWORD:'Show Password',
      ENTER_PASSWORD:'Enter Password',
      USERNAME:'Username',

      //REGISTRATION
      NAME:'Name',
      BUSINESS_NAME:'Business Name',
      BANK:'Bank',
      REGION:'Region',
      ACCOUNT_NUMBER:'Account Number',
      MOBILE:'Mobile',
      EMAIL:'Email',
      DATE_OF_BIRTH:'Date of Birth',
      OPTIONAL:'optional',
      SHARE_SOCIAL:'Share Social Accounts',
      ACCOUNT_NAME:'Type Account Name',
      //customer payment
      MERCHANT_CODE:'Merchant Code',
      AMOUNT:'Amount',
      FULL_AMOUNT:'Full Amount',
      CUSTOMER_MOBILE:'Customer Mobile',
      CUSTOMER_EMAIL:'Customer Email',
      CARD_TYPE:'Card Type',
      COMMENTS:'Comments',
      NEXT:'Next',
      //change password
      CURRENT_PASSWORD:'Current Password',
      NEW_PASSWORD:'New Password',
      CONFIRM_NEW_PASSWORD:'Confirm New Password',
      CONFIRM_MUST_MATCH:'Must Match with Password',

      //transactions
      SUCCESSFUL:'Successful',
      PENDING:'Pending',
      REJECTED:'Rejected',
      DATE:'Date',
      STATUS:'Status',

      //civil ID page
      FRONT_SIDE:'Front Side',
      BACK_SIDE:'Back Side',
      EXPIRY_DATE:'Expiry Date',
      SELECT_EXPIRY_DATE:'Select Expiry Date',
      VALIDATE_ID:'Validate ID',

      //withdraw request
      REQUEST_WITHDRAW : 'Request Withdraw',
      ACTUAL_BALANCE : 'Actual Balance',
      BANK_ACCOUNT:'Bank Account',

      //payment url
      SHARE_WITH:'Share With',
      CREATE_BILL:'Create Bill',
    });
    //$translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
    //$translateProvider.forceAsyncReload(true);

  }]);
