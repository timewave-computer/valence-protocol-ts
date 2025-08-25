import type { NextConfig } from 'next';
import NextBundleAnalyzer from '@next/bundle-analyzer';

const ANALYZE = process.env.ANALYZE === 'true';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@valence-protocol/domain-clients-core',
    '@valence-protocol/domain-clients-react',
    '@valence-protocol/domain-modal-react',
  ],
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: ANALYZE,
});

export default withBundleAnalyzer(nextConfig);
