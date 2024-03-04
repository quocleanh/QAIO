interface productModel {
    Id: number;
    Code: string;
    Name: string;
    Type: number;
    Price: number;
    SalePrice: number;
    Images: (string | URL | Request)[];
    Variables: {
        [x: string]: any;
        //push(arg0: { Name: string; List: { id: number; name: string; }[]; }): unknown;
        Name: string;
        List: { id: string; name: string; }[]
    },
    SelectedVariables: {
        [x: string]: any;
        //push(arg0: { Name: string; List: { id: number; name: string; }[]; }): unknown;
        Name: string;
        Id: string;
    },
    Description: string;
};
export default productModel;