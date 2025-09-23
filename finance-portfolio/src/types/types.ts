

  export interface Portfolio {
    portfolioId: string;
    name: string;
  }
  
  export interface CreateInvestmentRequest {
    portfolioId: string;
    assetId: string;
    units: number;
    buyPrice: number;
    currency: string;
    purchaseDate: string;
  }
  
  export interface ApiResponse<T> {
    message: string;
    statusCode: number;
    data: T;
  }
  

  export interface CreatePortfolioRequest {
    name: string;
    userId: string | null;
  }

  export interface Asset {
    assetId: string;
    tickerSymbol: string;
    assetType: string;
    name: string;
    currentPrice: number;
    currentValue: number; 
    units: number;
    amountInvested : number;        
    currency: string;
    lastUpdated: string;  
  }
  
  export interface Investment {
    investmentId: string; 
    portfolioId: string; 
    assetId: string;        
    assetName: string;
    units: number;     
    buyPrice: number;     
    currency: string;
    amountInvested : number;
    purchaseDate: string; 
  }


  export interface PortfolioInsight {
    portfolioId: string;
    portfolioName: string;
    diversificationScore: number;
    recommendation: string;
    assets: Asset[];
  }