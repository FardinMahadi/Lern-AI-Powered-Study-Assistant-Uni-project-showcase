// Environment variable validation

export const validateEnv = (): boolean => {
  const requiredEnvVars: string[] = [
    // Add your required environment variables here
    // 'NEXT_PUBLIC_FIREBASE_API_KEY',
    // 'NEXT_PUBLIC_SUPABASE_URL',
    // 'OPENAI_API_KEY',
  ];

  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    console.warn(`Warning: Missing environment variables: ${missingEnvVars.join(", ")}`);
  }

  return missingEnvVars.length === 0;
};

export const getEnv = (key: string, defaultValue: string = ""): string => {
  return process.env[key] || defaultValue;
};
