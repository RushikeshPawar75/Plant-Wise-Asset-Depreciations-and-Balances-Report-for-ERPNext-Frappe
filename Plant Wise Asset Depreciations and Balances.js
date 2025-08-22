frappe.query_reports["Plant Wise Asset Depreciations and Balances"] = {
    filters: [
        {
            fieldname: "company",
            label: __("Company"),
            fieldtype: "Link",
            options: "Company",
            default: frappe.defaults.get_user_default("Company"),
            reqd: 1,
        },
        {
            fieldname: "from_date",
            label: __("From Date"),
            fieldtype: "Date",
            default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today(), true)[1],
            reqd: 1,
        },
        {
            fieldname: "to_date",
            label: __("To Date"),
            fieldtype: "Date",
            default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today(), true)[2],
            reqd: 1,
        },
        {
            fieldname: "group_by",
            label: __("Group By"),
            fieldtype: "Select",
            options: ["Asset Category", "Asset"],
            default: "Asset Category",
        },
        {
            fieldname: "asset_category",
            label: __("Asset Category"),
            fieldtype: "Link",
            options: "Asset Category",
            depends_on: "eval: doc.group_by == 'Asset Category'",
        },
        {
            fieldname: "asset",
            label: __("Asset"),
            fieldtype: "Link",
            options: "Asset",
            depends_on: "eval: doc.group_by == 'Asset'",
        },
        {
            fieldname: "finance_book",
            label: __("Finance Book"),
            fieldtype: "Link",
            options: "Finance Book",
        },
        {
            fieldname: "branch",
            label: __("Branch"),
            fieldtype: "Link",
            options: "Branch",
            depends_on: "eval: doc.group_by == 'Asset'", // show only if group_by == Asset
            get_query: function() {
                return {
                    filters: {
                        company: frappe.query_report.get_filter_value('company')
                    }
                };
            }
        },
        {
            fieldname: "segment",
            label: __("Segment"),
            fieldtype: "Link",
            options: "Segment",
            depends_on: "eval: doc.group_by == 'Asset'", // show only if group_by == Asset
        },
        {
            fieldname: "cost_centre",
            label: __("Cost Center"),
            fieldtype: "Link",
            options: "Cost Center",
            depends_on: "eval: doc.group_by == 'Asset'", // show only if group_by == Asset
            get_query: function() {
                return {
                    filters: {
                        company: frappe.query_report.get_filter_value('company')
                    }
                };
            }
        },
    ],
};
