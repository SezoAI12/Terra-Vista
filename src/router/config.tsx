
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Lazy load components
const HomePage = lazy(() => import('../pages/home/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const BlogPage = lazy(() => import('../pages/blog/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const BuyerSellerPage = lazy(() => import('../pages/buyer-seller/page'));
const InvestmentsPage = lazy(() => import('../pages/investments/page'));
const PricingPage = lazy(() => import('../pages/pricing/page'));
const ProfilePage = lazy(() => import('../pages/profile/page'));
const WorkflowsPage = lazy(() => import('../pages/workflows/page'));
const AIAdvisoryPage = lazy(() => import('../pages/ai-advisory/page'));
const FeasibilityStudyPage = lazy(() => import('../pages/feasibility-study/page'));
const LoginPage = lazy(() => import('../pages/auth/login'));
const RegisterPage = lazy(() => import('../pages/auth/register'));
const PrivacyPage = lazy(() => import('../pages/legal/privacy'));
const TermsPage = lazy(() => import('../pages/legal/terms'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/blog',
    element: <BlogPage />
  },
  {
    path: '/contact',
    element: <ContactPage />
  },
  {
    path: '/marketplace',
    element: <BuyerSellerPage />
  },
  {
    path: '/buyer-seller',
    element: <BuyerSellerPage />
  },
  {
    path: '/investments',
    element: <InvestmentsPage />
  },
  {
    path: '/feasibility-study',
    element: <FeasibilityStudyPage />
  },
  {
    path: '/pricing',
    element: <PricingPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/workflows',
    element: <WorkflowsPage />
  },
  {
    path: '/ai-advisory',
    element: <AIAdvisoryPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/privacy',
    element: <PrivacyPage />
  },
  {
    path: '/legal/privacy',
    element: <PrivacyPage />
  },
  {
    path: '/legal/terms',
    element: <TermsPage />
  }
];

export default routes;
