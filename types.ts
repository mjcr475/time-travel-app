export interface HistoricalScene {
  id: string;
  name: string;
  imageUrl: string;
  prompt: string;
}

export type AppState =
  | 'CHOOSING_METHOD'
  | 'GENERATING_PORTRAIT'
  | 'ANALYZING'
  | 'SELECTING_SCENE'
  | 'GENERATING_SCENES'
  | 'GENERATING'
  | 'SHOWING_RESULT'
  | 'GENERATING_BATCH'
  | 'SHOWING_BATCH_RESULT';
