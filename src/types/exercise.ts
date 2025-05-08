export type BodyPart = string;
export type Equipment = string;
export type TargetMuscle = string;

export interface Exercise {
  id: string;
  name: string;
  bodyPart: BodyPart;
  target: TargetMuscle;
  equipment: Equipment;
  gifUrl: string;
}