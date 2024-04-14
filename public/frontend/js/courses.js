$(function() {

    let allLecturesSelected = false;
    let allBatchTypesSelected = false;
    let allClassTypesSelected = false;
    let selectedLectures = new Array();
    let selectedCourses = new Array();
    let selectedBatches = new Array();
    let selectedBatchTypes = new Array();
    let selectedClassTypes = new Array();
    let selectedSortBy = '';

    let timeout = null;

    let _selectedLectures = JSON.parse(_relatedLectureIds);
    let _selectedCourses = JSON.parse(_relatedCourseIds);
    let ___courseNotRelatedLecturers = JSON.parse(_courseNotRelatedLecturers);

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    for (let i = 0; i < ___courseNotRelatedLecturers.length; i++) {
        $('#filter-lecturer-'+___courseNotRelatedLecturers[i]).addClass('not-related');
    }

    $("#filter-all-lecturers:checked").each(function () {
        $('.hided-lecturers').removeClass("hide");
        $('#lecturer-show-more-text').html('Show less');
        $('#lecturer-show-more').removeClass("show-more");
    });

    $(".filter_lecturer:checked").each(function () {
        $('#'+this.id).parent().removeClass('hided-lecturers hide').insertAfter('.checkbox-all-lecturers');
        selectedLectures.push(this.value);
    });

    $(".filter_courses:checked").each(function () {
        $('#'+this.id).parent().removeClass('hided-course hide').prependTo('.by-course');
        selectedCourses.push(this.value);
    });

    $(".filter_batches:checked").each(function () {
        selectedBatches.push(this.value);
    });

    $(".filter_batchTypes:checked").each(function () {
        selectedBatchTypes.push(this.value);
    });

    $(".filter_classTypes:checked").each(function () {
        selectedClassTypes.push(this.value);
    });

    /**
     *  lecture check box all change
     */
    $("#filter-all-lecturers").change(function() {
        if(this.checked) {
            $('.filter_lecturer').prop('checked', true);
            $(".filter_lecturer:checked").each(function () {
                selectedLectures.push(this.value);
            });
            allLecturesSelected = true;
        } else {
            $('.filter_lecturer').prop('checked', false);
            selectedLectures = [];
        }
        loadPrograms();
    });

    /**
     * batch type all check box change
     */
    $("#filter-batchType-all").change(function() {
        if(this.checked) {
            $('.filter_batchTypes').prop('checked', true);
            $(".filter_batchTypes:checked").each(function () {
                selectedBatchTypes.push(this.value);
            });
            allBatchTypesSelected = true;
        } else {
            $('.filter_batchTypes').prop('checked', false);
            selectedBatchTypes = [];
        }
        loadPrograms();
    });

    /**
     * class type all checkbox change
     */
    $("#filter-classType-all").change(function() {
        if(this.checked) {
            $('.filter_classTypes').prop('checked', true);
            $(".filter_classTypes:checked").each(function () {
                selectedClassTypes.push(this.value);
            });
            allClassTypesSelected = true;
        } else {
            $('.filter_classTypes').prop('checked', false);
            selectedClassTypes = [];
        }
        loadPrograms();
    });

    /**
     * lecture checkbox change
     */
    $(".filter_lecturer").change(function() {
        if(this.checked) {
            selectedLectures.push(this.value)
        }else {
            const index = selectedLectures.indexOf(this.value);
            if (index > -1) {
                selectedLectures.splice(index, 1);
            }
        }
        loadPrograms();
    });

    /**
     * course checkbox change
     */
    $(".filter_courses").change(function() {
        if(this.checked) {
            selectedCourses.push(this.value)
        }else {
            const index = selectedCourses.indexOf(this.value);
            if (index > -1) {
                selectedCourses.splice(index, 1);
            }
        }
        loadPrograms();
    });

    /**
     * batch checkbox change
     */
    $(".filter_batches").change(function() {
        if(this.checked) {
            selectedBatches.push(this.value)
        }else {
            const index = selectedBatches.indexOf(this.value);
            if (index > -1) {
                selectedBatches.splice(index, 1);
            }
        }
        loadPrograms();
    });

    $(".filter_batchTypes").change(function() {
        if(this.checked) {
            selectedBatchTypes.push(this.value)
        }else {
            const index = selectedBatchTypes.indexOf(this.value);
            if (index > -1) {
                selectedBatchTypes.splice(index, 1);
            }
        }
        loadPrograms();
    });

    /**
     * class type checkbox change
     */
    $(".filter_classTypes").change(function() {
        if(this.checked) {
            selectedClassTypes.push(this.value)
        }else {
            const index = selectedClassTypes.indexOf(this.value);
            if (index > -1) {
                selectedClassTypes.splice(index, 1);
            }
        }
        loadPrograms();
    });

    $("#course-sort-by").change(function() {
        selectedSortBy = this.value;
        loadPrograms()
    });

    /**
     * show more action in lectures
     */
    $( "#lecturer-show-more" ).click(function() {
        let isShow = $(this).hasClass("show-more");

        if(isShow) {
            $('.hided-lecturers').removeClass("hide");
            $('#lecturer-show-more-text').html(showlessText);
            $('#lecturer-show-more').removeClass("show-more");
        } else {
            $('.hided-lecturers').addClass("hide");
            $('#lecturer-show-more-text').html(showmoreText);
            $('#lecturer-show-more').addClass("show-more")
        }
    });

    /**
     * show more action in courses
     */
    $( "#course-show-more" ).click(function() {
        let isShow = $(this).hasClass("show-more");

        if(isShow) {
            $('.hided-course').removeClass("hide");
            $('#course-show-more-text').html(showlessText);
            $('#course-show-more').removeClass("show-more");
        } else {
            $('.hided-course').addClass("hide");
            $('#course-show-more-text').html(showmoreText);
            $('#course-show-more').addClass("show-more")
        }
    });

    /**
     * setup url and submit
     */
    function loadPrograms(force = false, page = "page=1") {

        _selectedLectures = [];
        _selectedCourses = [];
        ___courseNotRelatedLecturers = [];

        let url = app_folder+"/"+lang_code+"/courses?filter=true";
        let fUrl = "?filter=true";

        if(selectedLectures.length > 0) {
            let cq = "&by-lecturer="+selectedLectures.join(",");
            if(allLecturesSelected) {
                cq = "&by-lecturer=all";
            }

            url += cq;
            fUrl += cq;
        }

        if(selectedCourses.length > 0) {
            let lq = "&by-course="+selectedCourses.join(",");
            url += lq;
            fUrl += lq;
        }

        if(selectedBatches.length > 0) {
            let bq = "&by-batch="+selectedBatches.join(",");
            url += bq;
            fUrl += bq;
        }

        if(selectedBatchTypes.length > 0) {
            let btq = "&by-batch-type="+selectedBatchTypes.join(",");
            if(allBatchTypesSelected) {
                btq = "&by-batch-type=all";
            }
            url += btq;
            fUrl += btq;
        }

        if(selectedClassTypes.length > 0) {
            let ctq = "&by-class-type="+selectedClassTypes.join(",");
            if(allClassTypesSelected) {
                ctq = "&by-class-type=all";
            }
            url += ctq;
            fUrl += ctq;
        }

        if(selectedSortBy !== '') {
            let sb = "&sort-by="+selectedSortBy;
            url += sb;
            fUrl += sb;
        }

        url += "&"+page;
        fUrl += "&"+page;

        if(timeout) {
            clearTimeout(timeout)
        }

        if(!force) {
            timeout = setTimeout(() => {
                loadAjax(url, fUrl)
            }, 2000)
        }else {
            loadAjax(url, fUrl)
        }
    }

    function loadAjax(url, fUrl) {

        $('#page-loader').show();
        $.ajax({
            type: "GET",
            url: base_url +"/"+lang_code+"/search-programs"+fUrl,
            dataType: "json",
            success: function (data) {
                if (data.status) {

                    $('#lecture-wrapper').html("");
                    $('#courses-pagination').html("")
                    $('#showing-result-of-classes-text').html("");
                    const paginateData = data.data;
                    const courses = paginateData.data;
                    const searchResultText = data.other_data.showing_result_text;

                    const notRelatedCoursesByLecture = data.other_data.not_related_courses_by_lectures;
                    const noRelatedLecturesByCourses = data.other_data.not_related_lectures_by_courses;
                    const relatedCourses = data.other_data.related_courses;
                    const relatedLecturers = data.other_data.related_lectures;

                    let text = '';
                    for (let i = 0; i < courses.length; i++) {

                        const programUrl = courses[i]['program_view_url'];
                        const lectureImage = courses[i]['lecture_image'];
                        const programTitle = courses[i]['title'];
                        const lectureName = courses[i]['lecture_name'];
                        const programType = courses[i]['type_text'];
                        const programTypeCssName = courses[i]['type_en_text'];
                        const programTypeIcon = courses[i]['type_icon'];
                        const batchType = courses[i]['batch_type_content'];
                        const batchTypeCsName = courses[i]['type_en_text'];
                        const programStart = courses[i]['start_date_text'];
                        const programEnd = courses[i]['end_date_text'];
                        const price = courses[i]['price_text'];
                        const currency = courses[i]['currency'];
                        const calenderIcon = courses[i]['calender_icon'];
                        const perMonthText = courses[i]['per_month_text'];
                        const learnMoreText = courses[i]['learn_more_text'];

                        text += "<a href="+programUrl+" class=\"lecture-card w-inline-block\">\n" +
                            "    <div class=\"top-sell-item-wrap\">\n" +
                            "        <div class=\"lecture-card-top\">\n" +
                            "            <div class=\"card-top-wrap\">\n" +
                            "                                    <div class=\"card-img-wrap\">\n" +
                            "                        <div class=\"image-wrapper-3-2 is-custom\">\n" +
                            "                            <img src="+lectureImage+" loading=\"lazy\" alt=\"\" class=\"image-wrapper_image is-lecture-avarar\"></div>\n" +
                            "                    </div>\n" +
                            "                \n" +
                            "                                    <h5 class=\"text-break-2\" title=\"Economics -Theory(Recorded)\">"+programTitle+"</h5>\n" +
                            "                                <div class=\"margin-bottom margin-small\">\n" +
                            "                    <div class=\"text-size-regular\">"+lectureName+"</div>\n" +
                            "                </div>\n" +
                            "            </div>\n" +
                            "\n" +
                            "\n" +
                            "            <div class=\"lecture-tag-wrapper\">\n" +
                            "                <div class=\"margin-right margin-xxsmall\">\n" +
                            "                                        <div class=\"tag is-"+programTypeCssName+"\"><img src="+programTypeIcon+" loading=\"lazy\" alt=\"\" class=\"icon-1x1-xxsmall is-padding-right\">\n" +
                            "                        <div>"+programType+"</div>\n" +
                            "                    </div>\n" +
                            "                </div>\n" +
                            "                <div class=\"tag is-"+batchTypeCsName+"\">\n" +
                            "                    <div class=\""+batchTypeCsName+"-tag-icon\"></div>\n" +
                            "                    <div>"+batchType+"</div>\n" +
                            "                </div>\n" +
                            "            </div>\n" +
                            "                    </div>\n" +
                            "        <div class=\"lecture-card-bottom\">\n" +
                            "            <div class=\"program-card-price-top\">\n" +
                            "                <div class=\"program-card-date-wrapper\"><img src="+calenderIcon+" loading=\"lazy\" alt=\"\" class=\"icon-1x1-xxsmall is-padding-right\">\n" +
                            "                    <div class=\"text-size-small\">"+programStart+" - "+programEnd+"</div>\n" +
                            "                </div>\n" +
                            "                <div class=\"program-card-price-wrapper\">\n" +
                            "                    <div class=\"margin-right margin-tiny\">\n" +
                            "\n" +
                            "                    </div>\n" +
                            "                    <h5> <span class=\"text-weight-light\">"+currency+"</span> "+price+" </h5>\n" +
                            "                    <div class=\"text-size-small is-price\">"+perMonthText+"</div>\n" +
                            "                </div>\n" +
                            "            </div>\n" +
                            "            <div class=\"lecter-card-break\"></div>\n" +
                            "            <div class=\"button-tertiary is-card-price\">\n" +
                            "                <div>"+learnMoreText+"</div>\n" +
                            "                <div class=\"button-tertiary_icon w-embed\">\n" +
                            "                    <svg width=\"8\" height=\"13\" viewBox=\"0 0 8 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                            "                        <path stroke=\"currentColor\" d=\"M1.5 11.5L6.5 6.5L1.5 1.5\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n" +
                            "                    </svg>\n" +
                            "                </div>\n" +
                            "            </div>\n" +
                            "        </div>\n" +
                            "    </div>\n" +
                            "</a>";
                    }

                        $(".filter_lecturer").each(function () {
                            $(this).removeClass("not-related");
                            if(noRelatedLecturesByCourses.includes(parseInt(this.value))) {
                                $(this).addClass("not-related");
                            }else {
                                $(this).removeClass("not-related");

                            }
                        });

                        $(".filter_courses").each(function () {
                            $(this).removeClass("not-related");
                            if(notRelatedCoursesByLecture.includes(parseInt(this.value))) {
                                $(this).addClass("not-related");
                            }else {
                                $(this).removeClass("not-related");

                            }
                        });

                    let pagination = "";

                    if(courses.length > 0) {
                        pagination += "<nav>\n";
                        pagination += "<ul class=\"pagination\">\n";


                        const pgLinks = paginateData.links;

                        for (let l = 0; l < pgLinks.length; l++) {

                            let id = "link_page_id_" + l;
                            if (pgLinks[l]['active']) {
                                pagination += "<li class=\"page-item active\" aria-current=\"page\"><span class=\"page-link\">" + pgLinks[l]['label'] + "</span></li>\n";
                            } else {
                                if (pgLinks[l]['url']) {
                                    pagination += "<li id=" + id + "  class=\"page-item\"><a class=\"page-link\" data-page=" + pgLinks[l]['url'] + ">" + pgLinks[l]['label'] + "</a></li>\n";
                                } else {
                                    pagination += "<li class=\"page-item disabled\" aria-disabled=\"true\" aria-label=" + pgLinks[l]['label'] + ">\n" +
                                        "                    <span class=\"page-link\" aria-hidden=\"true\">‹</span>\n" +
                                        "                </li>\n";
                                }

                            }


                        }

                        pagination += "</ul>";
                        pagination += "</nav>";
                    }

                    $('#lecture-wrapper').html(text);
                    $('#courses-pagination').html(pagination)
                    $('#showing-result-of-classes-text').html(searchResultText);

                    window.scrollTo(0, 0);


                    window.history.pushState("", "", url );

                    $('#page-loader').hide();

                    $(".page-item a").click(function(e) {
                        e.preventDefault();

                        const pageId = $(this).data("page");

                        let pageArray = pageId.split("&");

                        loadPrograms(true, pageArray[pageArray.length - 1] ?? "page=1")
                    } );

                    jQuery(function($) {
                        $('.by-lecturers .checkbox-group').has('input:checked').insertAfter('.checkbox-all-lecturers');
                        $('.by-course .checkbox-group').has('input:checked').prependTo('.by-course');
                        $('.by-batch .checkbox-group').has('input:checked').prependTo('.by-batch');
                        $('.by-batch-type .checkbox-group').has('input:checked').insertAfter('.checkbox-all-batch-type');
                        $('.by-type-class .checkbox-group').has('input:checked').insertAfter('.checkbox-all-type-class');
                    })
                }
            },
            error: function () {
                $('#page-loader').hide();
            }
        });
    }
})
