/**
 * Created by SudeshNT on 11/4/2016.
 */
angular.module('lang_ar',['pascalprecht.translate','ngSanitize'])
  .config(['$translateProvider',function($translateProvider){
    $translateProvider.translations('ar', {
      // main menu
      CUSTOMERS:'الزبائن',
      MERCHANTS:'التجار',
      TRANSACTIONS:'المعاملات',
      PROFILE:'الملف الشخصي',
      MESSAGES:'الرسالة',
      MEDIA:'وسائل الإعلام',
      FEES:'رسوم',
      CIVIL_ID:'البطاقة المدنية',
      PAYMENT_URL:'عنوان الدفع',
      ABOUT_US:'معلومات عنا',
      LOGOUT:'خروج',
      LOGIN:'تسجيل الدخول',
      REGISTER:'تسجيل',
      FORGOT_PASSWORD:'هل نسيت كلمة المرور؟',
      //sub menus
      ALL:'جميع',
      WITHDRAWALS:'السحوبات',
      REQUEST_WITHDRAWALS:'السحوبات طلب',
      EDIT_PROFILE:'تعديل الملف الشخصي',
      CHANGE_PASSWORD:'تغيير كلمة السر',
      //balance bar
      ACTUAL:'فعلي',
      ON_HOLD:'في الانتظار',
      CURRENT:'تيار',

      CONFIRM_PASSWORD:'تأكيد كلمة المرور',
      PASSWORD:'كلمه السر',
      SHOW_PASSWORD:'عرض كلمة المرور',
      ENTER_PASSWORD:'أدخل كلمة المرور',
      USERNAME:'اسم المستخدم',

      //REGISTRATION
      NAME:'اسم',
      BUSINESS_NAME:'الاسم التجاري',
      BANK:'بنك',
      REGION:'منطقة',
      ACCOUNT_NUMBER:'رقم حساب',
      MOBILE:'التليفون المحمول',
      EMAIL:'البريد الإلكتروني',
      DATE_OF_BIRTH:'تاريخ الولادة',
      OPTIONAL:'اختياري',
      SHARE_SOCIAL:'حصة الحسابات الاجتماعية',
      ACCOUNT_NAME:'نوع اسم الحساب',

      //customer payment
      MERCHANT_CODE:'كود التاجر',
      AMOUNT:'كمية',
      FULL_AMOUNT:'المبلغ الكامل',
      CUSTOMER_MOBILE:'موبايل العملاء',
      CUSTOMER_EMAIL:'العملاء البريد الإلكتروني',
      CARD_TYPE:'نوع البطاقة',
      COMMENTS:'تعليقات',
      NEXT:'التالى',
      //change password
      CURRENT_PASSWORD:'كلمة السر الحالية',
      NEW_PASSWORD:'كلمة السر الجديدة',
      CONFIRM_NEW_PASSWORD:'تأكيد كلمة المرور الجديدة',
      CONFIRM_MUST_MATCH:'يجب أن تتطابق مع كلمة المرور',

      //transactions
      SUCCESSFUL:'ناجح',
      PENDING:'ريثما',
      REJECTED:'مرفوض',
      DATE:'تاريخ',
      STATUS:'الحالة',

      //civil ID page
      FRONT_SIDE:'الجانب الامامي',
      BACK_SIDE:'الجانب الخلفي',
      EXPIRY_DATE:'تاريخ الانتهاء',
      SELECT_EXPIRY_DATE:'حدد تاريخ انتهاء الصلاحية',
      VALIDATE_ID:'التحقق من صحة معرف',

      //withdraw request
      REQUEST_WITHDRAW : 'اطلب سحب',
      ACTUAL_BALANCE : 'الرصيد الفعلي',
      BANK_ACCOUNT:'حساب البنك',

      //payment url
      SHARE_WITH:'شارك مع',
      CREATE_BILL:'إنشاء بيل',
    });
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
    //$translateProvider.forceAsyncReload(true);

  }]);
