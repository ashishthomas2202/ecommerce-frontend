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
  username: true,
  email: true,
  signin: {
    //false = never, "3" = 3 milliseconds ,"3s" = 3 seconds,"3h" = 3 hours,"3d" = 3 days,"3m" = 3 months ...
    expires: false,
    redirect: '/',
    link: '/user/signin',
  },
  signup: {
    redirect: '/', // changed to login page - check lines after the User object
    link: '/user/signup',
  },
  shipping: {
    link: '/user/shipping',
  },
};
User.signup.redirect = User.signin.link;

export const Pages = {
  main: [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/shop' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
  ],
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
