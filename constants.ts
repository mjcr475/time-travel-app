import type { HistoricalScene } from './types';

export const HISTORICAL_SCENES: HistoricalScene[] = [
  {
    id: 'rome',
    name: 'Ancient Rome',
    imageUrl: 'https://picsum.photos/seed/rome/400/400',
    prompt: 'Change the background of the person in this image to a detailed, photorealistic scene of a bustling street in ancient Rome with the Colosseum in the background. The lighting on the person should match the new background. The final image should look like a real photograph from that era.',
  },
  {
    id: 'roaring20s',
    name: 'Roaring \'20s',
    imageUrl: 'https://picsum.photos/seed/roaring20s/400/400',
    prompt: 'Transform the background of this photo into a lavish, dimly-lit speakeasy from the 1920s. The person should appear to be part of the scene, with lighting that reflects the jazz club atmosphere. Ensure the style looks like a vintage photograph from the Roaring Twenties.',
  },
  {
    id: 'moon',
    name: 'Moon Landing',
    imageUrl: 'https://picsum.photos/seed/moon/400/400',
    prompt: 'Place the person in this image onto the surface of the moon, as if they were an astronaut during the Apollo missions. The background should be the lunar landscape with the Earth visible in the sky. The lighting on the person should be harsh and direct, matching the lunar environment. Make it look like an official NASA photograph.',
  },
  {
    id: 'wildwest',
    name: 'Wild West',
    imageUrl: 'https://picsum.photos/seed/wildwest/400/400',
    prompt: 'Change the background to a dusty, sun-beaten main street of a Wild West town. The person should look like they are standing in front of a saloon. The lighting should be bright and evoke a hot day. The final image should have the quality of a sepia-toned, 19th-century photograph.',
  },
  {
    id: 'victorian',
    name: 'Victorian London',
    imageUrl: 'https://picsum.photos/seed/victorian/400/400',
    prompt: 'Edit the background of this portrait to be a foggy, gaslit street in Victorian London. The person should be integrated into the scene with soft, diffused lighting from the gas lamps. The final image should have the atmospheric quality of a 19th-century painting or early photograph.',
  },
  {
    id: 'future',
    name: 'Cyberpunk City',
    imageUrl: 'https://picsum.photos/seed/future/400/400',
    prompt: 'Transform the background of this photo into a neon-drenched, rainy street in a futuristic cyberpunk city at night. The person should be illuminated by the bright, colorful neon signs. The overall mood should be cinematic and high-tech, like a still from a science fiction film.',
  },
];
