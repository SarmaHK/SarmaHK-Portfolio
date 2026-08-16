'use client';

import { forwardRef } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    hideIcon?: boolean;
}

type ButtonAsButton = ButtonBaseProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
        href?: never;
    };

type ButtonAsLink = ButtonBaseProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
        href: string;
    };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-11 px-7 text-[10px] tracking-[0.2em] gap-3',
    md: 'h-[52px] px-9 text-[11px] tracking-[0.22em] gap-3',
    lg: 'h-[58px] px-12 text-[12px] tracking-[0.25em] gap-4',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    function Button(props, ref) {
        const {
            variant = 'primary',
            size = 'md',
            children,
            className = '',
            icon,
            hideIcon = false,
            ...rest
        } = props;

        // ── VARIANT STYLES ──
        let variantCls = '';

        if (variant === 'primary') {
            variantCls = [
                // Bold gold fill
                'bg-[var(--gold)] text-[var(--background)]',
                'font-semibold',
                'shadow-[0_4px_24px_rgba(200,164,93,0.3)]',
                // Hover: glass glow bloom
                'hover:bg-[var(--gold-highlight)]',
                'hover:shadow-[0_0_0_3px_rgba(200,164,93,0.15),0_8px_40px_rgba(200,164,93,0.4)]',
                'hover:-translate-y-[2px]',
                // Active
                'active:translate-y-0 active:scale-[0.97]',
                'active:shadow-[0_2px_12px_rgba(200,164,93,0.2)]',
            ].join(' ');
        } else if (variant === 'secondary') {
            variantCls = [
                // Glass outline
                'bg-white/[0.04] backdrop-blur-xl',
                'text-[var(--text-primary)] font-medium',
                'border border-white/[0.12]',
                // Hover: gold glass morph
                'hover:bg-[var(--gold)]/[0.08] hover:border-[var(--gold)]/40',
                'hover:text-[var(--gold)]',
                'hover:shadow-[0_0_0_3px_rgba(200,164,93,0.08),0_8px_32px_rgba(200,164,93,0.12)]',
                'hover:backdrop-blur-2xl',
                'hover:-translate-y-[2px]',
                // Active
                'active:translate-y-0 active:scale-[0.97]',
            ].join(' ');
        } else {
            variantCls = [
                'bg-transparent text-[var(--text-secondary)] font-medium',
                'border border-transparent',
                'hover:text-[var(--text-primary)] hover:bg-white/[0.05]',
                'active:scale-[0.97]',
            ].join(' ');
        }

        const baseClasses = [
            'group/btn relative inline-flex items-center justify-center',
            'font-mono uppercase whitespace-nowrap',
            'rounded-full select-none cursor-pointer',
            'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
            sizeClasses[size],
            variantCls,
            className,
        ].join(' ');

        const arrowColor = variant === 'primary' ? 'var(--background)' : 'currentColor';

        const iconEl = hideIcon ? null : (icon ?? (
            <span className="relative inline-flex items-center justify-center group-hover/btn:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={arrowColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8h9" />
                    <path d="M8.5 3.5L13 8l-4.5 4.5" />
                </svg>
            </span>
        ));

        if ('href' in rest && rest.href) {
            const { href, ...linkRest } = rest as ButtonAsLink;
            return (
                <Link
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    className={baseClasses}
                    {...linkRest}
                >
                    {children}
                    {iconEl}
                </Link>
            );
        }

        return (
            <button
                ref={ref as React.Ref<HTMLButtonElement>}
                className={baseClasses}
                {...(rest as ButtonAsButton)}
            >
                {children}
                {iconEl}
            </button>
        );
    }
);
