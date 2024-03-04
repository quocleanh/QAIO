import { FlatList, Text, View } from "react-native";
import COLORS from "../../consts/colors";
import productModel from "../../models/productModel";
import ProductCards from "../ProductCards";
import productRealted from "../../data/detail/productRealted";

const ProductRelatedComponent: React.FC<{ product: productModel }> = ({ product }) => {
    return <View style={{ flex: 1, backgroundColor: COLORS.White, paddingHorizontal: 10, paddingVertical: 10, marginTop: 15 }}>
        <Text style={{ marginBottom: 15, fontSize: 16, color: COLORS.Secondary, fontWeight: 'bold' }}>Sản phẩm liên quan</Text>
        <FlatList
            scrollEnabled={false}
            data={productRealted}
            renderItem={({ item }: { item: productModel }) => <ProductCards product={item} />}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} />
    </View>;
};
          
export default ProductRelatedComponent;