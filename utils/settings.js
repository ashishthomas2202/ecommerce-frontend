export const Brand = {
  name: 'Ecommerce',
  fullName: 'Ecommerce LLC',
  logo: '',
};

export const Shop = {
  collections: [
    { name: 'Mens', link: '/' },
    { name: 'Womens', link: '/' },
    { name: 'Kids Wear', link: '/' },
    { name: 'Accessories', link: '/' },
    { name: 'Shirt', link: '/' },
    { name: 'Jeans', link: '/' },
  ],
};

export const User = {
  // username, email - atleast one has to be true
  // warning *** Never change this after the website is live(fix: drop the users from mongodb database collection and restart the application )
  username: true,
  email: true,
  password: {
    minLength: 6,
  },

  auth: { link: '/user/auth', redirect: '/' },

  // signin: {
  //   //false = never, "3" = 3 milliseconds ,"3s" = 3 seconds,"3h" = 3 hours,"3d" = 3 days,"3m" = 3 months ...
  //   expires: false,
  //   redirect: '/',
  //   link: '/user/auth/signin',
  // },
  // signup: {
  //   redirect: '/', // changed to login page - check lines after the User object
  //   link: '/user/auth/signup',
  // },
  addressBook: {
    link: '/user/addressBook',
  },
};
// User.signup.redirect = User.signin.link;

export const Address = {
  country: { default: 'US' },
};

export const Pages = {
  main: [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/shop' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
  ],
  checkout: {
    link: '/checkout',
    redirect: '/',

    shoppingBag: {
      link: '/shoppingBag',
      redirect: '/checkout', // value changed! - check lines after the Pages object
    },
    shipping: {
      link: '/user/shipping',
      redirect: '/',
    },
    billing: {
      link: '/user/billing',
      redirect: '/',
    },
    payment: {
      link: '/user/payment',
      redirect: '/',
    },
  },
};

// Pages.checkout.shoppingBag.redirect = Pages.checkout.shipping.link;
// Pages.checkout.shipping.redirect = Pages.checkout.billing.link;
// Pages.checkout.billing.redirect = Pages.checkout.payment.link;
export const Checkout = {
  link: '/checkout',
  redirect: '/',
};

export const Social = {
  list: [
    {
      name: 'Facebook',
      link: '/',
      icon: 'https://e7.pngegg.com/pngimages/340/745/png-clipart-computer-icons-white-instagram-icon-text-logo.png',
    },
    {
      name: 'Instagram',
      link: '/',
      icon: 'https://e7.pngegg.com/pngimages/340/745/png-clipart-computer-icons-white-instagram-icon-text-logo.png',
    },
    {
      name: 'Twitter',
      link: '/',
      icon: 'https://e7.pngegg.com/pngimages/340/745/png-clipart-computer-icons-white-instagram-icon-text-logo.png',
    },
    {
      name: 'Pinterest',
      link: '/',
      icon: 'https://e7.pngegg.com/pngimages/340/745/png-clipart-computer-icons-white-instagram-icon-text-logo.png',
    },
    {
      name: 'Youtube',
      link: '/',
      icon: 'https://e7.pngegg.com/pngimages/340/745/png-clipart-computer-icons-white-instagram-icon-text-logo.png',
    },
  ],
};
