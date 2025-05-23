import React from "react";
import { dashboard } from "../assets/images";
import {
  Briefcase,
  CheckCircle,
  BarChart2,
  Search,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
export default function Homepage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                <span className="block">Track Your</span>
                <span className="block text-[#2c4e85]">Job Applications</span>
              </h1>
              <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Stay organized during your job search. Track applications,
                interviews, and offers all in one place. Never miss an
                opportunity again.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link
                    to="/login"
                    className="px-6 py-3 rounded-md text-base font-medium text-white bg-[#2c4e85] hover:bg-[#254170] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85]"
                  >
                    Get Started
                  </Link>
                  <a
                    href="#how-it-works"
                    className="px-6 py-3 rounded-md text-base font-medium text-[#2c4e85] border border-[#2c4e85] hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4e85]"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <img
                    className="w-full"
                    src={dashboard}
                    // src="/placeholder.svg?height=400&width=600"
                    alt="Job Tracker Dashboard Preview"
                  />
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <svg
                      className="h-20 w-20 text-[#2c4e85]"
                      fill="currentColor"
                      viewBox="0 0 84 84"
                    >
                      <circle
                        opacity="0.9"
                        cx="42"
                        cy="42"
                        r="42"
                        fill="white"
                      />
                      <path d="M55 42L35 55V29L55 42Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#2c4e85] font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to manage your job search
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
              Our comprehensive tools help you stay organized and focused on
              landing your dream job.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#2c4e85] text-white">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-slate-900">
                    Application Tracking
                  </h3>
                  <p className="mt-2 text-base text-slate-500">
                    Keep track of all your job applications in one place. Never
                    lose track of where you've applied.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#2c4e85] text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-slate-900">
                    Status Updates
                  </h3>
                  <p className="mt-2 text-base text-slate-500">
                    Update and track the status of each application from applied
                    to interview to offer.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#2c4e85] text-white">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-slate-900">
                    Analytics Dashboard
                  </h3>
                  <p className="mt-2 text-base text-slate-500">
                    Visualize your job search progress with charts and
                    statistics to optimize your strategy.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#2c4e85] text-white">
                  <Search className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-slate-900">
                    Search and Filter
                  </h3>
                  <p className="mt-2 text-base text-slate-500">
                    Quickly find specific applications with powerful search and
                    filtering capabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#2c4e85] font-semibold tracking-wide uppercase">
              How It Works
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Simple steps to organize your job search
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
              Get started in minutes and take control of your job search
              process.
            </p>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-slate-50 text-lg font-medium text-slate-900">
                  Steps
                </span>
              </div>
            </div>

            <div className="mt-6 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#2c4e85] flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <h3 className="ml-3 text-xl font-semibold text-slate-900">
                        Create an Account
                      </h3>
                    </div>
                    <p className="mt-3 text-base text-slate-500">
                      Sign up for a free account to get started with JobTracker.
                      No credit card required.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#2c4e85] flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <h3 className="ml-3 text-xl font-semibold text-slate-900">
                        Add Your Applications
                      </h3>
                    </div>
                    <p className="mt-3 text-base text-slate-500">
                      Log the jobs you've applied to with company, position, and
                      application date.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#2c4e85] flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <h3 className="ml-3 text-xl font-semibold text-slate-900">
                        Track Your Progress
                      </h3>
                    </div>
                    <p className="mt-3 text-base text-slate-500">
                      Update statuses as you progress through interviews and
                      receive offers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#2c4e85] font-semibold tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Trusted by job seekers everywhere
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
              See what our users have to say about how JobTracker has helped
              them.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-slate-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                    JD
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">John Doe</h4>
                    <p className="text-sm text-slate-500">Software Engineer</p>
                  </div>
                </div>
                <p className="mt-4 text-slate-600">
                  "JobTracker helped me stay organized during my job search. I
                  applied to over 50 positions and would have been lost without
                  this tool. I landed my dream job within 2 months!"
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                    JS
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Jane Smith</h4>
                    <p className="text-sm text-slate-500">Marketing Manager</p>
                  </div>
                </div>
                <p className="mt-4 text-slate-600">
                  "The analytics dashboard gave me insights into which types of
                  applications were getting the most responses. I adjusted my
                  strategy and started getting more interviews immediately."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                    RJ
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Robert Johnson</h4>
                    <p className="text-sm text-slate-500">Product Designer</p>
                  </div>
                </div>
                <p className="mt-4 text-slate-600">
                  "I was juggling multiple interviews and almost missed a
                  follow-up. JobTracker's notification system saved me from what
                  could have been a huge missed opportunity."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i === 4 ? "text-slate-300" : ""}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2c4e85] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block">Create your account today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-[#bccce6]">
              Join thousands of job seekers who have streamlined their job
              search process.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#2c4e85] bg-white hover:bg-slate-50"
                >
                  Get Started
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </Link>
              </div>
              <div className="ml-3 inline-flex">
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#254170] hover:bg-[#1f304e]"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
