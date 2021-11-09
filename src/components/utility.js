function priceratingfunction(costlevel){
    switch(costlevel){
        case 1:{
            
            return '€';
        }
        case 2:{

            return '€€';
        }
        case 3:{

            return '€€€';
        }
        case 4:{
            return '€€€€';
        }
        case 5:{
            return '€€€€€';
        }
     }
}

    function reviewfunction(review){
        return review / 10;
    }


    module.exports={
        // priceratingfunction:priceratingfunction(costlevel),
        // reviewfunction:reviewfunction(review)
        priceratingfunction,
        reviewfunction
    }

