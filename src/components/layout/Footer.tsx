import { Bag, GithubLogo, Heart } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
              <Bag size={14} weight="fill" className="text-white" />
            </div>
            <span className="font-bold text-text-primary">
              kart<span className="text-brand">.</span>
            </span>
          </Link>

          {/* Center note */}
          <p className="text-sm text-text-muted flex items-center gap-1.5">
            Built with <Heart size={13} weight="fill" className="text-accent-rose" /> for the assessment
          </p>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <GithubLogo size={16} weight="fill" />
            Source code
          </a>
        </div>
      </div>
    </footer>
  );
}
