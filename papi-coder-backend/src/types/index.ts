export interface Gap {
  type: string;
  desc: string;
  severity: 'high' | 'medium' | 'critical';
}

export interface GridSearchItem {
  param: string;
  space: string;
  status: 'Pending' | 'Completed';
}

export interface PaperData {
  title: string;
  gaps: Gap[];
  pipeline: string[];
  dataStats: {
    samples: string;
    split: string;
    seed: string;
    preprocessing: string;
  };
  skeletonCode: string;
  gridSearch: GridSearchItem[];
}