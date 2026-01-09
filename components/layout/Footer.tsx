export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} ModDash. Built with Next.js
          </div>
          <div className="flex space-x-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900 transition">
              Documentation
            </a>
            <a href="#" className="hover:text-gray-900 transition">
              Support
            </a>
            <a href="#" className="hover:text-gray-900 transition">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

