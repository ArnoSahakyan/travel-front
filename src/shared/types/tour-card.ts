export interface ITourCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  duration: number;
  mode?: 'public' | 'admin';
}
