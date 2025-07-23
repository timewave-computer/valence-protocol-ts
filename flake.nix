{
  description = "Valence TS Dev Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

        nodejs = pkgs.nodejs_22;
        pnpm = pkgs.nodePackages.pnpm;
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            nodejs
            pnpm
          ];

          shellHook = ''
            export NODE_OPTIONS=--max_old_space_size=8192
            echo "Started Valence TS Dev Shell"
          '';
        };
      });
}
