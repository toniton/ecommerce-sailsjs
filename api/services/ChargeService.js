/**
 * Created by Toni on 11/9/2016.
 */

module.exports = {
    checkChargeStatus: function (params) {
        var promise = new Promise(function (resolve, reject) {
            params.reference = params.reference.replace(/PTR/g, 'FLW')
            FlutterWaveService.getTransactionStatus(params).then(function (response) {
                Charge.update({
                    transactionreference: params.reference.replace(/FLW/g, 'PTR')
                },{
                    responsecode: response.responsecode
                }).then(function (charge) {
                    if (response.responsecode === '00') {
                        resolve(charge[0]);
                    }
                    reject();
                }).catch(reject);
            }).catch(reject);
        });
        return promise;
    }
};

