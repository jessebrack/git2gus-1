/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

const jsforce = require('jsforce');

module.exports = async function createWorkItemInGus(
    subject,
    description,
    productTag,
    status,
    foundInBuild,
    priority,
    relatedUrl,
    recordTypeId
) {
    const conn = new jsforce.Connection();
    await conn.login(
        process.env.GUS_USERNAME,
        process.env.GUS_PASSWORD,
        err => {
            if (err) {
                console.log('fail');
                return console.error(err);
            }
        }
    );
    return Promise.resolve(
        conn.sobject('agf__ADM_Work__c').create(
            {
                agf__Subject__c: subject,
                agf__details__c: description,
                agf__details_and_steps_to_reproduce__c: description,
                agf__product_tag__c: productTag,
                agf__status__c: status,
                agf__found_in_build__c: foundInBuild,
                agf__priority__c: priority,
                agf__related_url__c: relatedUrl,
                recordtypeid: recordTypeId
            },
            (err, ret) => {
                if (err || !ret.success) {
                    return console.error(err, ret);
                }
                return ret;
            }
        )
    );
};
