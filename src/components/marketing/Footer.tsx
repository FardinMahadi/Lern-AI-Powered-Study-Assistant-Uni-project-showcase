"use client";

import "./styles/Particles.css";

import Image from "next/image";
import { useEffect, useRef } from "react";
import ShinyText from "@/components/shared/ShinyText";
import { useTheme, alpha } from "@mui/material/styles";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";
import { Box, Typography, Link as MuiLink, Divider } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Box
      component="footer"
      sx={{
        color: theme.palette.text.secondary,
        py: 6,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          zIndex: 1,
        }}
      >
        <Particles
          particleColors={[
            theme.palette.text.primary,
            alpha(theme.palette.text.primary, 0.8),
            alpha(theme.palette.text.primary, 0.6),
          ]}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </Box>
      <Box
        sx={{
          maxWidth: "7xl",
          mx: "auto",
          px: 4,
          position: "relative",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 8,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Image
                src="/images/logo.png"
                alt="Lern Logo"
                width={24}
                height={24}
                className="object-contain"
              />
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                Lern
              </Typography>
              <Box
                component="sup"
                sx={{
                  p: 2,
                  border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  borderRadius: "999px",
                  transform: "scale(0.75)",
                  fontSize: "0.75rem",
                }}
              >
                Beta
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.9,
                color: theme.palette.text.secondary,
              }}
            >
              Empowering learners worldwide with quality education.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 600,
                mb: 3,
                letterSpacing: "-0.02em",
              }}
            >
              Quick Links
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box component="li">
                <MuiLink
                  href="/about"
                  sx={{
                    color: theme.palette.text.secondary,
                    textDecoration: "none",
                    "&:hover": {
                      color: theme.palette.text.primary,
                    },
                    transition: "color 0.2s ease",
                  }}
                >
                  About Us
                </MuiLink>
              </Box>
              <Box component="li">
                <MuiLink
                  href="/courses"
                  sx={{
                    color: theme.palette.text.secondary,
                    textDecoration: "none",
                    "&:hover": {
                      color: theme.palette.text.primary,
                    },
                    transition: "color 0.2s ease",
                  }}
                >
                  Courses
                </MuiLink>
              </Box>
              <Box component="li">
                <MuiLink
                  href="/contact"
                  sx={{
                    color: theme.palette.text.secondary,
                    textDecoration: "none",
                    "&:hover": {
                      color: theme.palette.text.primary,
                    },
                    transition: "color 0.2s ease",
                  }}
                >
                  Contact
                </MuiLink>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 600,
                mb: 3,
                letterSpacing: "-0.02em",
              }}
            >
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
              Email:{" "}
              <ShinyText
                text="mahadihasanfardin2015@gmail.com"
                disabled={false}
                speed={3}
                className="custom-class"
              />
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Phone:{" "}
              <ShinyText
                text="+88 01540159331"
                disabled={false}
                speed={3}
                className="custom-class"
              />
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            borderColor: alpha(theme.palette.divider, isLight ? 0.3 : 0.5),
            mt: 6,
            pt: 6,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: theme.palette.text.secondary,
          }}
        >
          &copy; {new Date().getFullYear()} Lern. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

const defaultColors = ["#ffffff", "#ffffff", "#ffffff"];

const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const int = parseInt(hex, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  className?: string;
}

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ depth: false, alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize, false);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
    };

    if (moveParticlesOnHover) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

    for (let i = 0; i < count; i++) {
      let x: number, y: number, z: number, len: number;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(col, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let animationFrameId: number;
    let lastTime = performance.now();
    let elapsed = 0;

    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * speed;

      program.uniforms.uTime.value = elapsed * 0.001;

      if (moveParticlesOnHover) {
        particles.position.x = -mouseRef.current.x * particleHoverFactor;
        particles.position.y = -mouseRef.current.y * particleHoverFactor;
      } else {
        particles.position.x = 0;
        particles.position.y = 0;
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * speed;
      }

      renderer.render({ scene: particles, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    particleColors,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
  ]);

  return <div ref={containerRef} className={`particles-container ${className}`} />;
};
