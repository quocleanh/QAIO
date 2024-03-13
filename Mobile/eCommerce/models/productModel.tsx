interface productModel {
    Id: number;
    Code: string;
    Name: string;
    Type: number;
    Price: number;
    SalePrice: number;
    tags: { [x: string]: string; }[];
    promotion: string; 
    PresentImage : string
    Images: (string | URL | Request)[];
    Variables: { Name: string; List: { id: string; name: string; }[]; }[];
    SelectedVariables: { Name: string; Id: string; };
    
    Description: string;
};
export default productModel;