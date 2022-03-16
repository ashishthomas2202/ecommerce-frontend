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
  username: true,
  email: true,
  signin: {
    //false = never, "3" = 3 milliseconds ,"3s" = 3 seconds,"3h" = 3 hours,"3d" = 3 days,"3m" = 3 months ...
    expires: false,
    redirect: '/',
    link: '/user/signin',
  },
  signup: {
    redirect: '/',
    link: '/user/signup',
  },
  shipping: {
    link: '/user/shipping',
  },
};

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
